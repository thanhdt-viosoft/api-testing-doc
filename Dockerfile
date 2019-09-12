##########################################################
#####  BUILD ENV                                         #
##########################################################
FROM node:alpine
WORKDIR /usr/src/app

RUN apk --no-cache --quiet add git openssh
RUN npm install -g api-testing-doc@latest

ENV ROOT=

ENTRYPOINT [ "testapi" ]
CMD [ "$ROOT" ]

# docker build -t onapis/api-testing-doc .

# Oauth
# docker run -t --rm onapis/api-testing-doc "http://onapis.com/files/upload/597aaa573f91b427e66ab09d/5c6e785b7a5cc2001b0579ba/2019/2/22/3723ecb4-d609-4154-9aeb-7f1a6553b64b.zip" "./oauth.md" --color=auto
# docker-compose run --rm api-testing-doc "http://onapis.com/files/upload/597aaa573f91b427e66ab09d/5c6e785b7a5cc2001b0579ba/2019/2/22/3723ecb4-d609-4154-9aeb-7f1a6553b64b.zip" "/docs/onapis/oauth.md"

# Files
# docker run -t --rm onapis/api-testing-doc "http://onapis.com/files/upload/597aaa573f91b427e66ab09d/5c6bd7225d817b001b616c4d/2019/2/22/f5469338-c7a1-4c6c-b4aa-1aed2a9ced6e.zip" "./files.md" --color=auto
# docker-compose run --rm api-testing-doc "http://onapis.com/files/upload/597aaa573f91b427e66ab09d/5c6bd7225d817b001b616c4d/2019/2/22/f5469338-c7a1-4c6c-b4aa-1aed2a9ced6e.zip" "/docs/onapis/files.md"

# Mail
# docker run -t --rm onapis/api-testing-doc "http://onapis.com/files/upload/597aaa573f91b427e66ab09d/5c6e785b7a5cc2001b0579ba/2019/2/22/d705c7c8-7932-4ad9-a5ca-ebee4eab9c58.zip" "./mail.md" --color=auto
# docker-compose run --rm api-testing-doc "http://onapis.com/files/upload/597aaa573f91b427e66ab09d/5c6e785b7a5cc2001b0579ba/2019/2/22/d705c7c8-7932-4ad9-a5ca-ebee4eab9c58.zip" "/docs/onapis/mail.md"

# Log
# docker run -t --rm onapis/api-testing-doc "http://onapis.com/files/upload/597aaa573f91b427e66ab09d/5c6e785b7a5cc2001b0579ba/2019/2/22/6678689e-f1e8-410f-9f7d-af9911a13cb5.zip" "./log.md" --color=auto
# docker-compose run --rm api-testing-doc "http://onapis.com/files/upload/597aaa573f91b427e66ab09d/5c6e785b7a5cc2001b0579ba/2019/2/22/6678689e-f1e8-410f-9f7d-af9911a13cb5.zip" "/docs/onapis/log.md"