import Card from '../../components/card/Card'
import Container from '../../components/container/Container'
import Pagination from '../../components/paginate/Paginate'
import { useSelector } from 'react-redux'

const category = () => {
  const numPaginate = useSelector(s => s.numPaginate.value)
  const products = useSelector(s => s.productsByCategory.value)

  let from = (numPaginate - 1) * 5
  let to = numPaginate * 5
  const current = products.slice(from, to)


  return (
    <Container>
      <div className='mb-5 flex flex-wrap justify-center items-center'>
        {current.map((p)=>
          <Card
            key={p.name}
            id={p.id}
            name={p.name}
            image={p.image}
            price={p.price}
            description={p.description}
          />
        )}
      </div>
      <div className='relative h-[50px] w-[100%]'>
        <Pagination
          products={products}
        />
      </div>
    </Container>
  )
}
export default category
