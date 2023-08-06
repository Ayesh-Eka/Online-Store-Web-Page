<script>
  import logo from '../img/store.png'
  export let data;
  $: producsts = data.product;
  const categorie = data.categories;


  import { writable } from 'svelte/store';

  const searchProductTitle = writable('');

  function filterBySearch(products, searchQuery) {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  $: filteredProducts = filterBySearch(producsts, $searchProductTitle);

  let priceFilter = 0;
  let categoryFilter = "All";

  const priceFilterOption = [
    {
      value: 0,
      text: "All",
    },
    {
      value: 1,
      text: "Under 10",
    },
    {
      value: 2,
      text: "10 - 20",
    },
    {
      value: 3,
      text: "21 - 30",
    },
    {
      value: 4,
      text: "30+",
    },
  ];

  let currentPage = 1;
  const itemsPerPage = 10;

  function filterProducts(a, b) {
    const selectedCategory = categoryFilter;
    const priceRange = priceFilter;

    currentPage = 1

    return producsts?.filter((product) => {
      if (selectedCategory == "All" && priceRange == 0) {
        return producsts;
      }

      const isCategoryMatch =
        !categoryFilter ||
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const isPriceMatch =
        !priceRange ||
        priceRange === 0 ||
        (priceFilter == 1 && product.price < 10) ||
        (priceFilter == 2 && product.price >= 10 && product.price <= 20) ||
        (priceFilter == 3 && product.price > 20 && product.price <= 30) ||
        (priceFilter == 4 && product.price > 30);
      return isCategoryMatch && isPriceMatch;
    });
  }

  let filteredProducts = filterProducts(categoryFilter, priceFilter);

  $: {
    filteredProducts = filterProducts(categoryFilter, priceFilter);
  }



  function paginate(pageNum) {
    currentPage = pageNum;

  }

 

  $: pageNumbers = [];
  function createPagerArray(total) {
    pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  $: createPagerArray(filteredProducts.length);

  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;
  $:console.log("startIndex",startIndex)
 $: displayedProducts = filteredProducts.slice(startIndex, endIndex);

</script>
<div class="bg-cyan-50">
<div class="fixed top-0 left-0 w-full bg-gray-800 text-white">
  <div class="container mx-auto px-4 py-2">
    <ul class="flex space-x-4">
      <li><a href="#" class="hover:underline">Home</a></li>
    </ul>
  </div>
</div>
<br /><br />
<div class="flex justify-end">
  <div class="pt-2 relative mx-auto text-gray-600">
    <div class="flex items-center">
      <img src={logo} alt="Logo" class="h-12 w-12 mr-8" />
      <input
        class="border-2 border-gray-300 bg-white h-10 w-full px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search by product title"
        bind:value={$searchProductTitle}
      />
    </div>
  </div>
</div>
<h2><b>Sort By :  </b></h2>
<h3> Category - </h3>
<p>{categoryFilter}</p>
<div>
  <div class="grid grid-cols-12 gap-8">
    <div class="">
      <input
        type="radio"
        name="category"
        id="All"
        value={"All"}
        bind:group={categoryFilter}
      />
      <label for="All"> All</label>
    </div>
    {#each categorie as category, i}
      <div class="">
        <input
          type="radio"
          id={category}
          name="category"
          value={category}
          bind:group={categoryFilter}
        />
        <label for={category}> {category}</label>
      </div>
    {/each}
  </div>
  <br />
  <h3>Price -</h3> 
  <div class="grid grid-cols-12 gap-8">
  {#each priceFilterOption as el, i}
    <label>
      <input type="radio" name="p" value={el.value} bind:group={priceFilter} />
      {el.text}
    </label>
  {/each}
</div>
  <br /><br />

  <div class="grid grid-cols-8 gap-5">
    {#each displayedProducts as product, i}
     <div class="bg-black aspect-w-1 aspect-h-1 border border-black">
        <img class="object-cover w-full h-full" src={product.image} alt="" />
      </div>
      <div class="mt-2 text-black">
        <h3>{product.title}</h3>
        <h3><b>Price : </b>{product.price}</h3>
        <h3><b>Category : </b>{product.category}</h3>
      </div>
    {/each}
  </div>
</div>
<br/>
<center>
  <div class="flex justify-center">
  <div class="flex space-x-2 flex-wrap">
    {#each pageNumbers as number}
    <div key={number} class="">
      <button on:click={() => paginate(number)} href="!#" class="page-link bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        {number}
      </button>
    </div>
    {/each}
  </div>
</div>
</center>
</div>