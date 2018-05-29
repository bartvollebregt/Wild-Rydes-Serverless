pipeline {
  agent any
  stages {

    stage("Zip Lambda Function") {
      steps {
        sh '''#!/bin/bash -l
          cd lambda ; zip -r ../lambda.zip *
        '''
      }
    }

    stage("Terraform") {
      steps {
        sh '''#!/bin/bash -l
          cd infrastructure
          bash infrastructure.sh 'deploy --force'
        '''
      }
    }

    stage("S3 Sync") {
      steps {
        sh '''#!/bin/bash -l
          jq '.IotEndpoint = "'$(aws iot describe-endpoint --output text)'"' src/build/config/api_config.json > src/build/config/api_config.tmp && mv src/build/config/api_config.tmp src/build/config/api_config.json
        
          aws s3 sync . s3://wild-rydes-api-dev-hosting --profile your-profile --delete --exclude "js/*"  
        '''
      }
    }

  }

}
