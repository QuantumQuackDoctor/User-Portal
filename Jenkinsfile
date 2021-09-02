pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    stages {
        stage('SonarQube analysis') {
            steps {
                script {
                    tool name: 'SonarQube', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                }
                withSonarQubeEnv('SonarQube') {
                    //sh "npm install -D sonarqube-scanner"
                    sh "${SonarQube}/bin/sonar-scanner -Dsonar.projectKey=User-Portal -Dsonar.sources=. -Dsonar.host.url=http://18.218.39.157:9000 -Dsonar.login=admin"
                }

            }    
        }
        // stage('Quality Gate') {
        //     steps {
        //         waitForQualityGate abortPipeline= true
        //     }   
        // }
        stage('Build') {
            steps {
                sh 'npm run build --prod'
            }
        }
        stage('Test') {
            steps {
                sh 'ng test --browsers ChromeHeadless'
            }
        }

    }
} 