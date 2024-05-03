rm -rf env
lsof -ti:8000 | xargs kill
docker stop njs
docker remove njs
docker image rm njs
