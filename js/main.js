import {createMockData} from "./mockData.js";
import {createArrayPhotos, renderFragmentDOM} from "./renderPictures.js";

const mockData = createMockData();
const resultArray = createArrayPhotos(mockData);
renderFragmentDOM(resultArray);
