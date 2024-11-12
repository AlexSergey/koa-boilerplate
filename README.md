### Debug

Webstorm:

- Add configuration: Attach to Node.js/Chrome
- Set breakpoints in the webstorm
- Run the application
- Press debug button in the top bar
- Reload the application

### DB Setup

```shell
docker build -t sqlite_db .
```

```shell
docker run -it -v sqlite_data:/data --name sqlite_container sqlite_db
```

Run

```shell
npm run db:migrate:development
```

```shell
npm run db:seed:development
```
