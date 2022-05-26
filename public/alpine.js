
document.addEventListener('alpine:init', () => {


  Alpine.data('clothing', () => ({
    garments: [],
    seasonFilter: '',
    genderFilter: '',
    maxPrice: 0,
    garmentData: {
      description: '',
      price: '',
      img: '',
      season: '',
      gender: '',
    },
    init() {
      fetch('/api/garments')
        .then(r => r.json())
        .then(userData => { this.garments = userData.data })
    },

    filterData() {
      fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
        .then(r => r.json())
        .then(results => {
          this.garments = results.data
        })
    },

    filterPrice() {
      fetch(`/api/garments/${this.maxPrice}`)
        .then(r => r.json())
        .then((result) => {
          this.garments = result.data
        });
    },


    addGarment() {
      fetch(`/api/garment/`,{
        body: this.garmentData
      })
        .then(r => r.json())
        .then((result) => {
          this.garments = result.data
        });
    }

  }));

})