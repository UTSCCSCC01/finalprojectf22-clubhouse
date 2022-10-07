import * as React from "https://cdn.skypack.dev/react@17.0.1";
import '../styles.scss';

function App(){
  return(
    <div className="wrapper">
      <Card
        img="https://mma.prnewswire.com/media/1427431/AA_Logo.jpg?p=facebook"
        title="Alcoholics Anonymous"
        description="Have a crippling addiction to alcohol and want to stop drowning your sorrows with the bottle? Join Alcoholics Anonymous!"/>
    </div>
  )
}

function Card(props){
  const url = 'http://127.0.0.1:5001/browse-clubs';
  const [noMore,setnoMore] = useState(true);
  const [items, setItems ] = useState([]);
  const [page, setPage] = useState(2);
  useEffect(() => {
  const getevents = async ()=>{
  const res = await fetch(url+"?page=1");
    const data = await res.json();
    setItems(data);
  };
  getevents();
  },[]);
  const fetchData = async() => {
    const res = await fetch(url+'?page='+page);
    const data = await res.json(); 
    return data;
    };
    const fetchd = async () => {
    const eventfromserv = await fetchData();
    setItems([...items, ...eventfromserv]);
    if(eventfromserv.length === 0 || eventfromserv.length <1){
      setnoMore(false);
    } 
    setPage(page+1);
  }
  <InfiniteScroll
    dataLength={items.length} //This is important field to render the next data
    next={fetchd}
    hasMore={noMore}
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
      <b>End of Clubs</b>
      </p>}>  
    {items.map((item) => {
      return(
        <div className="card">
          <div className="card__body">
            <img src={props.img} class="card__image"/>
            <h2 className="card__title">{props.title}</h2>
            <p className="card__description">{props.description}</p>
          </div>
          <button className="card__btn">View Club</button>
        </div>
      )})
    }        
  </InfiniteScroll>
}

export default BrowseClubs