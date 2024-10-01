const fetchData = async () => {
  const data = await fetch('/find-all', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  const res = await data.json()
  return res;
}

window.addEventListener('DOMContentLoaded', async (e) => {
  const products = await fetchData()
  const templateProduct = document.getElementById('row-product').content
  const table = document.getElementById('table-product')
  if(products) {
    products.forEach((prod, index) => {
      const content = templateProduct.cloneNode(true)
      const nameBox = content.querySelector('#name-product')
      const categoryBox = content.querySelector('#category-product')
      const priceBox = content.querySelector('#price-product')
      const updateAction = content.querySelector('#update-action')
      const deleteAction = content.querySelector('#delete-action')
      nameBox.textContent = prod.name
      categoryBox.textContent = prod.category
      priceBox.textContent = prod.price
      updateAction.href = `/update/${prod.id}`
      deleteAction.setAttribute('data-product-id', prod.id)
      table.appendChild(content)
    })
  }else{
      const content = templateProduct.cloneNode(true)
      const nameBox = content.querySelector('#name-product')
      nameBox.textContent = 'Sin Resultados'
      table.appendChild(content)
  }
})
