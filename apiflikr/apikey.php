<?php
class Flickr { 
	private $apiKey = 'cf63f8b2d5f0a63ef88e575fd4c70036'; 
 
	public function __construct() {
	} 
 
	public function search($query = null) { 
		$search = 'http://flickr.com/services/rest/?method=flickr.photos.search&api_key=' . $this->apiKey . '&text=' . urlencode($query) . '&per_page=50&format=php_serial'; 
		$result = file_get_contents($search); 
		$result = unserialize($result); 
		return $result; 
	} 
}


?>