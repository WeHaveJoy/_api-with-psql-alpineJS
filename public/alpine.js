document.addEventListener('alpine:init', () => {
  alert("alpine")
Alpine.data('clothing', () => ({
    garments : [],
    init() {
		fetch('/api/garments')
			.then(r => r.json())
			.then(userData => {this.garments = userData })
      console.log(userData);
    },
	
}));

})