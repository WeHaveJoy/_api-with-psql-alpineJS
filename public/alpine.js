

document.addEventListener("alpine:init", () => {
  Alpine.data("clothing", () => ({
    garments: [],
    seasonFilter: "",
    genderFilter: "",
    maxPrice: 0,
    garmentData: {
      description: "",
      price: "",
      img: "",
      season: "",
      gender: "",
    },
    message: "",
    error: false,
    init() {
      fetch("/api/garments")
        .then((r) => r.json())
        .then((userData) => {
          this.garments = userData.data;
        });
    },

    filterData() {
      fetch(
        `/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`
      )
        .then((r) => r.json())
        .then((results) => {
          this.garments = results.data;
        });
    },

    filterPrice() {
      fetch(`/api/garments/${this.maxPrice}`)
        .then((r) => r.json())
        .then((result) => {
          this.garments = result.data;
        });
    },

    deleteGarments(id){
      console.log(id);
      axios
      .delete(`/api/garments/${id}`)
      .then((r) => r.json())
      .then((userData) => {
       this.garments = userData.data;
        // .catch((err) => console.log(err));
      });
      
    },

    addGarment() {
      console.log(this.garmentData);
      fetch(`/api/garment/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.garmentData),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.status === 'seccess') {
            this.message = "New garment added!";
            this.error = false;
          }else if (r.status === 'error'){
            const error = r.message;
            this.message = error
            this.error= true;
        }

        setTimeout(() => {
          this.message = "";
          this.error = false;
        }, 3000);
          this.init();
        })
         .catch((err) => console.log(err));
    }

    
    

    // showMessage() {
     
    //     this.message = "New garment added!";
    //     this.error = false;

    //   setTimeout(() => {
    //     this.message = "";
    //     this.error = false;
    //   }, 3000);
    // },
  }));
});
