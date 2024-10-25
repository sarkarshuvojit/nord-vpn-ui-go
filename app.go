package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"log/slog"
)

// App struct
type App struct {
	ctx              context.Context
	apiServerPort    string
	cancelHttpServer context.CancelFunc
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		apiServerPort: "8888",
	}
}

func handleBase(w http.ResponseWriter, r *http.Request) {
	slog.Info("Writing response")
	w.Write([]byte("Hello dude"))
}

// startHttpServer is called to start the api server
// in the background it will bind to PPPP port and set it to the context
// it's caller will receieve a cancelFunc,
// when cancelFunc is called, httpServer will be shut down
func (a *App) startHttpServer(ctx context.Context) context.CancelFunc {
	ctxCancel, cancelFunc := context.WithCancel(ctx)

	mux := http.NewServeMux()
	mux.HandleFunc("/", handleBase)
	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", a.apiServerPort),
		Handler: mux,
	}

	// prepare for shutdown
	go func(ctx context.Context) {
		// Wait for someone to cancel
		<-ctx.Done()

		shutdownCtx, cancelShutdown := context.WithTimeout(ctx, 10*time.Second)
		defer cancelShutdown()

		if err := server.Shutdown(shutdownCtx); err != nil {
			slog.Error("Failed to shutdown http server.", "err", err)
			slog.Info("Trying to force kill http server.")

			// force close
			if errClose := server.Close(); errClose != nil {
				slog.Error("Failed to force kill http server", "err", err)
			}
		}

	}(ctxCancel)

	// Start the server
	go func(ctx context.Context) {
		slog.Info(fmt.Sprintf("Starting the http server on port %s", server.Addr))
		if err := server.ListenAndServe(); err != nil {
			if err != http.ErrServerClosed {
				slog.Error(
					"Failed to start http server",
					"port", a.apiServerPort,
					"err", err,
				)
			}
		}
	}(ctxCancel)

	return cancelFunc
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	cancelHttpServer := a.startHttpServer(ctx)
	a.cancelHttpServer = cancelHttpServer
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
