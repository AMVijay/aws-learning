# SQS - Simple Queue Service

## Key attributes of SQS
* Visibility timeout 
    * The time for a message will not be visible to other consumers once the message is retrieved or consumed by a listener or consumer.
    * it can be from 0 seconds to 12 hrs.
* Delivery Delay
    * The time how long a message will not be visible to any consumer either first time or after visibility timeout.
    * it can be from 0 seconds to 15 minutes.
* Receive Message wait time
    * The time delay between Receive Requests to Queue.
    * It can be from 0 seconds to 20 seconds.
    * Longer value indicates the number of polling will be less to that queue, and ofcource less cost.
* Message retention period
    * how long a message can stay in the queue.
    * it can be from 1 minute to 14 days.
* Maximum message size
    * Max message size in a queue.
    * It can be from 1 KB to 256 KB.