npm i express prisma @prisma/client dotenv
npx prisma init

npx prisma migrate dev --name init

npx prisma generate

//update models
npx prisma migrate dev --name author

docker-compose up -d --build

docker exec -it express-api npx prisma generate
docker exec -it express-api npx prisma migrate dev --name init
docker exec -it express-api npx prisma db pull

http://localhost:9090/targets?search=
http://localhost:9090/graph?g0.expr=http_requests_total&g0.tab=1&g0.display_mode=lines&g0.show_exemplars=0&g0.range_input=1h
