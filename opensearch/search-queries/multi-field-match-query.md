# OpenSearch 

Below Elastic Search Query helps to search by matching multiple fields.

```
GET _search
{
  "from" : 0, 
  "size" : 1000,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
             "<field name>": "<field value>"
          }
        },
        {
          "match": {
             "<field name>": "<field value>"
          }
        }
      ]
    }
  }
}
```