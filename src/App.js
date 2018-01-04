import React, { Component } from 'react';
import './App.css';

class ProductRow extends Component {
  render () {
    return (
        <tr>
          <td>{ this.props.product.name }</td>
          <td>{ this.props.product.price }</td>
        </tr>
    )
  }
}

class ProductCategoryRow extends Component {
  render () {
    return (
      <tr>
        <td colSpan="2">{ this.props.category }</td>
      </tr>
    )
  }
}

class ProductTable extends Component {
  render () {
    const products = this.props.products
    const sports = products
      .filter((item) => item.category === "Sporting Goods")
      .map((item, index) => <ProductRow key={index} product={item}/>)
      
    const electronics = products
      .filter((item) => item.category === "Electronics")
      .map((item, index) => <ProductRow key={index} product={item}/>)

    return (
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Product</td>
          </tr>
        </thead>
        <tbody>
          <ProductCategoryRow category={ 'Sporting Goods' } />
          { sports }
          <ProductCategoryRow category={ 'Electronics' } />
          { electronics }
        </tbody>
      </table>
    )
  }
}

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.searchChange = this.searchChange.bind(this)
  }

  searchChange (event) {
    this.props.inputChange(event.target.value)
  }

  render() {
    return (
      <form>
        <div>
          <input type="text"
            value={this.props.productName}
            placeholder="请输入产品名称"
            onChange={this.searchChange}
          />
        </div>
        <div>
          <label>
            <input type="checkbox" />
            Only show products in stocks
          </label>
        </div>
      </form>
    )
  }
}

class FilterableProductTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      productName: '',
      isChecked: ''
    }
  }
  
  inputChange (val) {
    this.setState({
      productName: val
    })
  }

  render () {
    return (
      <div className="App">
        <SearchBar inputChange={productName => this.inputChange(productName)}
          productName={this.state.productName}
        />
        <ProductTable products={this.props.products}/>
      </div>
    );
  }
}

export default FilterableProductTable;
