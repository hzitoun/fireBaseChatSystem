/**
*
* JS Script handling the connected user box.
* @author Hamed ZITOUN (zitoun.hamed@gmail.com)
* @Date: 2015-06-07
*/

function getMessageId(element) {
    return element.key().replace(/[^a-z0-9\-\_]/gi,'');
  }

  setIdleTimeout(10000);
  setAwayTimeout(10000);