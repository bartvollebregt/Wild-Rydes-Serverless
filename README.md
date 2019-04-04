# Wild Rydes Serverless

This application is based on the Wild Rydes tutorial for a serverless application by Connor Leech: 
[http://connorleech.info/](http://connorleech.info/blog/Tutorial-for-building-a-Web-Application-with-Amazon-S3-Lambda-DynamoDB-and-API-Gateway/)

It features some cool stuff to act as an example for:
 - Authentication with Cognito UserPools
 - Website fully hostable in S3
 - Backend calls through API Gateway -> Lambda (-> DynamoDB)
 
I couldn't find the Wild Rydes application provisioned anywhere in either Serverless or Terraform.
Therefore I tried provisioning it myself.

## Deploying
To deploy the stack run:
`(cd infrastructure; bash infrastructure.sh 'deploy')`

Then sync the website to the created s3 bucket:
`aws s3 sync . s3://wild-rydes-api-dev-hosting --profile your-profile --delete --exclude "lambda/*" --exclude "infrastructure/*" --exclude ".git/*" --exclude ".idea/*" --exclude "*.iml" --exclude "Jenkinsfile" --exclude ".gitignore"`


To take the stack down run:
`(cd infrastructure; bash infrastructure.sh 'remove --force')`

## TODO
- Set authorizer for API globally (so we don't have to configure it for every endpoint) (if possible)
- More examples for DynamoDB?
- Move Vendor JS files to npm (package.json)

## Known Issues
In the infrastructure folder you will find the resources to deploy this application to AWS with Serverless.
Because of a [bug](https://github.com/serverless/serverless/issues/3212#issuecomment-362339403) it is not possible to dynamically point to a Cognito UserPool as a API Gateway authorizer.
The only solution at this point is to break the application in an API and AUTH part and deploy them separately.
I've created a bash file at `infrastructure/infrastructure.sh` to simplify the deployment.

## License

Wild Rydes Serverless is released under the [MIT License](LICENSE).
