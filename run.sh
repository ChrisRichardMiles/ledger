cd database
bash run.sh

cd ../frontend
docker build -t my-nextjs-app .
docker run -p 3000:3000 --name nextjs-app my-nextjs-app


