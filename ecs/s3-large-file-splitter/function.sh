function handler () {
    EVENT_DATA=$1
    echo "$EVENT_DATA" $EVENT_DATA

    RESPONSE="{\"statusCode\": 200, \"body\": \"Hello from Lambda!\"}"
    echo $RESPONSE
}