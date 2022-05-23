
document.addEventListener('alpine:init', () => {
  
  
Alpine.data('clothing', () => ({
    garments : [],
    seasonFilter : '',
     genderFilter : '',
    maxPrice: 0,
    init() {
		fetch('/api/garments')
			.then(r => r.json())
			.then(userData => {this.garments = userData.data })
    },
	
    filterData() {
      fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
      .then(r => r.json())
      .then(results=>{
          this.garments = results.data   
      })
}, 


// priceRangeElem.addEventListener('change', function(evt){
// 	const maxPrice = evt.target.value;
// 	// showPriceRangeElem.innerHTML = maxPrice;

//   fetch(`/api/garments/price/${this.maxPrice}`)
// 		.then(function(result) {
// 			this.garments =  result.data
// 		});
	  
// 	 })
}));

	
})