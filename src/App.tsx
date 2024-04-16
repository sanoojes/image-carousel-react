import ImageCarousel from "./components/ImageCarousel";

const App = () => {
    return (
        <ImageCarousel url="https://picsum.photos/v2/list" limit={5} page={1} />
    );
};

export default App;
