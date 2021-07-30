# Feegow Public API

## Publicando uma nova versão

- Documente as alterações da versão no `CHANGELOG.md`
- Incremente a versão no `package.json`
- Execute `npm run push-publish`
- Adicione a versão no campo `Release title` da página que abrir

> Ao executar `npm run push-publish` são executados os comandos abaixo:
> ```
> npm publish
> git add .
> git commit -m \"Update %npm_package_version%\"
> git tag -a %npm_package_version%
> git push origin
> git push origin %npm_package_version%
> start https://github.com/feegow/feegow-public-api-node-package/releases/new?tag=%npm_package_version%
> ```