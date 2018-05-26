FROM alpine:3.7
RUN \
    apk -Uuv add groff less python py-pip && \
    apk add jq && \
	pip install awscli && \
    apk add --no-cache mysql-client

ADD bin/run.sh .

RUN chmod +x run.sh
ENTRYPOINT ["./run.sh"]