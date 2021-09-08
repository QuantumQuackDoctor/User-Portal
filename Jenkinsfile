pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    stages {
        // stage('SonarQube analysis') {
        //     steps {
        //         script {
        //             //tool name: 'SonarQube', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
        //             scannerHome = tool 'SonarQube Scanner 4.6'
        //         }
        //         withSonarQubeEnv('SonarQube') {
        //             //sh "npm install -D sonarqube-scanner"
        //             sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=User-Portal -Dsonar.sources=. -Dsonar.host.url=http://18.218.39.157:9000 -Dsonar.login=admin"
        //         }

        //     }    
        // }
        // stage('Quality Gate') {
        //     steps {
        //         waitForQualityGate abortPipeline= true
        //     }   
        // }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run sonar'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('S3 Deploy') {
            steps {
                withAWS(credentials: '33586397-1614-42ed-a4fd-f501ce5f4125', region: 'us-east-2') {
                    //sh 'ansible-galaxy collection install community.aws'
                    //sh 'ansible-playbook Playbooks/S3BucketDeploy.yml'
                }
            }
        }    
    }
    post {
        success {
            script {
                sh 'npm prune'
            }
        }
    }
} 