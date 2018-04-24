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
          aws s3 sync . s3://wild-rydes-api-dev-hosting --profile your-profile --delete --exclude "lambda/*" --exclude "infrastructure/*" --exclude ".git/*" --exclude ".idea/*" --exclude "*.iml" --exclude "Jenkinsfile" --exclude ".gitignore"  
        '''
      }
    }

  }
}
