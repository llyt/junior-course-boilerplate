export default (x) => x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : null
