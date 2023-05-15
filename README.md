# Laravel API Project

This project is a Laravel API built using Laravel Sail/Docker and a ReactJS frontend.

## Installation

1. Clone the repository

```
git clone https://github.com/firdavs9512/clinic-api-and-frontend.git
```

2. Install dependencies

```
cd clinic-api-and-frontend
composer install
npm install
```

3. Run the Sail/Docker containers

If using Laravel Sail:
```
./vendor/bin/sail up -d
```
If using Docker:
```
docker-compose up -d
```

4. Set up the .env file

```
cp .env.example .env
php artisan key:generate
```

Update the following database variables in the `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

5. Migrate and seed the database

```
php artisan migrate --seed
```

6. Install node js packages

```
npm install
```

7. Compile frontend assets

```
npm run dev
```

## Usage

Start the development server:

```
php artisan serve
```

You can access the API at `http://localhost:8000/api` and the frontend at `http://localhost:8000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.