# FROM node:14-alpine
FROM nikolaik/python-nodejs:python3.10-nodejs14-alpine	

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
ENV PYTHONPATH=/usr/lib/python3.10/site-packages/
# Bundle APP files
COPY . /

RUN apk add --no-cache tzdata && cp -r -f /usr/share/zoneinfo/Europe/Brussels /etc/localtime
RUN apk add --no-cache g++ gcc libgcc libstdc++ linux-headers make python3=~3.9 python3-dev --quiet
RUN apk add py3-pip py3-scipy py3-numpy py3-pandas py3-matplotlib
RUN pip install xlrd

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" > /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/v3.12/main" >> /etc/apk/repositories \
    && apk upgrade -U -a \
    && apk add \
    libstdc++ \
    chromium \
    harfbuzz \
    nss \
    freetype \
    ttf-freefont \
    font-noto-emoji \
    wqy-zenhei \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

RUN yarn add node-gyp -g 
RUN yarn 
# RUN yarn build --quiet

# Show current folder structure in logs
#RUN ls -al -R 
RUN chromium-browser --no-sandbox  --headless --use-gl=swiftshader --disable-software-rasterizer --disable-dev-shm-usage
EXPOSE 9001
CMD [ "yarn", "start" ]
