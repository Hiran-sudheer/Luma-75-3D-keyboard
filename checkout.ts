// Opens the local product details sheet from the hero.
export async function checkout() {
  window.dispatchEvent(new Event("luma:details"));
}
