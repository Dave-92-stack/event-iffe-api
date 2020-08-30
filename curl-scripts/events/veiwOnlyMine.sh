#!/bin/sh
API="http://localhost:4741"
URL_PATH="/userevents"
curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --data '{ "ownerEvent": "'"${ID}"'" }'
echo