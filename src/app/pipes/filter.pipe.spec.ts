import { FilterPipe } from './filter.pipe';
describe('Pipe: FilterPipe', () => {
    let pipe: FilterPipe;
    let items = [
        { _id: "5ccc2b874dc3c815209495d0", Project: "Dvya", Start_Date: "2019-05-08", End_Date: "2019-05-08", Priority: 0 },
        { _id: "5ccc2c820ebd7a1fa8e896c0", Project: "asdasda", Start_Date: "2019-05-04", End_Date: "2019-05-03", Priority: 0 },
        { _id: "5ccc2ec1dfdb1d413831b7c7", Project: "Hello W", Start_Date: "2019-05-04", End_Date: "2019-05-03", Priority: 14 },
        { _id: "5ccc30175ef7d722dc036a73", Project: "Project Name", Start_Date: "2019-05-15", End_Date: "2019-05-15", Priority: 3 },
        { _id: "5ccc30325ef7d722dc036a74", Project: "asdsadas", Start_Date: "2019-05-17", End_Date: "2019-05-23", Priority: 7 },
        { _id: "5ccc30e8fae84a08c88444ec", Project: "asdada", Start_Date: "2019-05-10", End_Date: "2019-05-16", Priority: 2 },
        { _id: "5ccc31f7fed5983e84ab9cd1", Project: "asdsa", Start_Date: "2019-05-08", End_Date: "2019-05-04", Priority: 6 },
        { _id: "5ccfef00b3f4b22e1878a5ae", Project: "", Start_Date: "2019-05-08", End_Date: "2019-05-06", Manager: "" },
        { _id: "5ccfefaecc58594a8c157ea2", Project: "Backend", Start_Date: "2019-05-07", End_Date: "2019-05-08", Priority: 4 }]

    beforeEach(() => {
        pipe = new FilterPipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return matching search text', () => {
        let result = pipe.transform(items, 'Hello', 'Project');
        expect(result.length).toBe(1);
        expect(result[0]._id).toBe("5ccc2ec1dfdb1d413831b7c7");
    });

    it('should return matching search text for Dvya', () => {
        let result = pipe.transform(items, 'asd', 'Project');
        expect(result.length).toBe(4);
    });

    it('should return when no search text ', () => {
        let result = pipe.transform(items, undefined, 'Project');
        expect(result.length).toBe(9);
    });

    it('should return when no items ', () => {
        let result = pipe.transform(undefined, 'as', 'Project');
        expect(result.length).toBe(0);
    });

});