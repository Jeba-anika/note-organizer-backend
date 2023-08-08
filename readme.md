### Live Link: https://online-cow-hut-chi.vercel.app/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/648f3db4e52bf7ce864ec42c(Single GET)
- api/v1/users/648f3db4e52bf7ce864ec42c (PATCH)
- api/v1/users/648dea318e05e4d5c0993d1b (DELETE)

#### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/648f3f21e52bf7ce864ec437 (Single GET)
- api/v1/cows/648f3f21e52bf7ce864ec437 (PATCH)
- api/v1/cows/648f10f5e7e80c2e8c73d713 (DELETE)

### Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=2
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Dhaka
- api/v1/cows?searchTerm=Brah

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)

- try with the json:

```json
{
  "cow": "648f3f21e52bf7ce864ec437",
  "buyer": "648f3d88e52bf7ce864ec42a"
}
```
