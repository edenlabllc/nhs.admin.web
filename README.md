# National Health Service administration portal

[![Build Status](https://api.travis-ci.org/edenlabllc/nhs.admin.web.svg?branch=master)](https://travis-ci.org/edenlabllc/nhs.admin.web)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Demo (dev): http://admin-dev.ehealth.world/

API: [edenlabllc/ehealth.api](https://github.com/edenlabllc/ehealth.api)

## Installation

### Heroku One-Click Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/edenlabllc/nhs.admin.web)

### Docker

Dashboard can be deployed as a single container from
[edenlabllc/nhs.admin.web](https://hub.docker.com/r/edenlabllc/nhs.admin.web/)
Docker Hub.

## Configurations

Application supports these environment variables:

| Environment Variable  | Default Value                              | Description                                         |
| --------------------- | ------------------------------------------ | --------------------------------------------------- |
| `PORT`                | `8080`                                     | Node.js server port.                                |
| `API_HOST`            | `http://api.dev.asclepius.com.ua`          | Ehealth API host.                                   |
| `SITEMAP_HOSTNAME`    | `http://localhost:8080`                    | URL will be used in sitemap generated urls          |
| `LANG_COOKIE_NAME`    | `lang`                                     | Name of the cookie, where storing language variable |
| `AUTH_COOKIE_NAME`    | `token`                                    | Name of the cookie, where storing token variable    |
| `CLIENT_ID`           | `e32e51ac-f720-4e42-adb3-67d504f3ad30`     | Front-End client id                                 |
| `CLIENT_SECRET`       | `ZzluaHd0V01lU1IwTnd4VkdBcUZHUT09`         | Front-End client secret                             |
| `SCOPES`              | `app:authorize legal_entity:read`          | EHEALTH auth scopes                                 |
| `OAUTH_URL`           | `http://auth.dev.asclepius.com.ua/sign-in` | Front-End client id                                 |
| `OAUTH_REDIRECT_PATH` | `/auth/redirect`                           | Redirect path for create token in EHEALTH           |

## Technologies

* React
* Redux
* Webpack
* Enzyme
* Jest
* Puppeteer

### Git flow

Every task should start a new branch. Branch should be named as task number what
its corresponding. After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

* Unit tests for business logic (we use Jest)
* Integration tests for UI components (we use Enzyme)
* Acceptance tests for user stories (we use Puppeteer)

### PR

Every task finishes with PR. Prettier lint check and tests are blocking PRs. To
simplify PR review, we deploy every PR's branch automatically on Heroku.

## License

See [LICENSE.md](LICENSE.md).
