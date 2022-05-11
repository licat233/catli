import React, { Component } from 'react';
import Gallery from './SimpleGallery';

interface AppProps { }
interface AppState {
  name: string;
  images: ImageInfo[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps | Readonly<AppProps>) {
    super(props);
    this.state = {
      name: 'React',
      images: [],
    };
  }

  requestImages = () => {
    return new Promise((resolve, reject) => {
      fetch("//pic.catli.net/api/images").then(resp => resp.json())
        .then((res: BaseResponse) => {
          if (res.success) {
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(err => {
          reject(err)
        })
    })
  }


  //请求数据
  componentDidMount() {
    this.requestImages().then((res) => {
      const resp = res as BaseResponse
      this.setState({
        images: resp.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <Gallery
          galleryID="my-test-gallery"
          images={this.state.images}
        />
      </div>
    );
  }
}

export default App;

const defaultData = [
  {
    largeURL:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
    thumbnailURL:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg',
    width: 1875,
    height: 2500,
  },
  {
    largeURL:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
    thumbnailURL:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
    width: 1669,
    height: 2500,
  },
  {
    largeURL:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
    thumbnailURL:
      'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
    width: 2500,
    height: 1666,
  },
];