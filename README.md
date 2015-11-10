# Grabber
**Assumption**: keyword for search is the part of the URL and can be  replaced

**Result**: True. [http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=photo](http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=photo)) After replacing *photo* on *smartphone* is returned the suitable result http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=smartphone

**Assumption**: Result list is returned from **ul[id*='result'] > li** quary and each item contains anchor with useful *href* and engine can, by loading the linked location, get title, price, description etc.

**Result**: Partially True. DOM structure is different between **smartphone** and **apple** search results.
So, I've changed query to *"ul[id*='result'] li[id='result_1'] a"*.

Moreover, I configured list of queris in separate file **config.json** where I can adjust queries for title, price, etc. **for each** grabbing target.


