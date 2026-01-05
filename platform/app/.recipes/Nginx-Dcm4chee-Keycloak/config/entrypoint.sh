#!/bin/sh
set -e

# Start oauth2-proxy in background
oauth2-proxy --config=/etc/oauth2-proxy/oauth2-proxy.cfg &

# nginx MUSS PID 1 werden
exec nginx -g "daemon off;"
