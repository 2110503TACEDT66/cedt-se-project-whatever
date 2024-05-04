const Feedback = require('../models/Feedback');
const mongoose = require('mongoose')

describe('Add feedback', () => {
    it('Validate comment and rating', async () => {
        try {
            const feedback = new Feedback({ 
                comment: "Best dentist I ever seen!!",
                rating: 5 
            });

            await feedback.validate();
        } catch (error) {
            // Handle any errors during validation
            expect(error.errors.comment).toBeUndefined();
            expect(error.errors.rating).toBeUndefined();
        }
    });

    it('Add only comment', async () => {
        try {
            const feedback = new Feedback({ 
                comment: "Best dentist I ever seen!!", 
            });

            await feedback.validate();
        } catch (error) {
            // Handle any errors during validation
            expect(error.errors.comment).toBeUndefined();
            expect(error.errors.rating).toBeDefined();
        }
    });

    it('Add only rating', async () => {
        try {
            const feedback = new Feedback({ 
                rating: 5
            });

            await feedback.validate();
        } catch (error) {
            // Handle any errors during validation
            expect(error.errors.comment).toBeDefined();
            expect(error.errors.rating).toBeUndefined();
        }
    });

    it('rating > 5, not valid', async () => {
        try {
            const feedback = new Feedback({ 
                comment: "Best dentist I ever seen!!",
                rating: 6
            });

            await feedback.validate();
        } catch (error) {
            // Handle any errors during validation
            expect(error.errors.comment).toBeUndefined();
            expect(error.errors.rating).toBeDefined();
        }
    });

    it('rating < 1, not valid', async () => {
        try {
            const feedback = new Feedback({ 
                comment: "Best dentist I ever seen!!",
                rating: 0
            });

            await feedback.validate();
        } catch (error) {
            // Handle any errors during validation
            expect(error.errors.comment).toBeUndefined();
            expect(error.errors.rating).toBeDefined();
        }
    });

    it('Do not add neither comment nor rating', async () => {
        try {
            const feedback = new Feedback({});

            await feedback.validate();
        } catch (error) {
            // Handle any errors during validation
            expect(error.errors.comment).toBeDefined();
            expect(error.errors.rating).toBeDefined();
        }
    });
});


describe('MongoDB Insertion Tests', () => {

  it('should insert a document into a collection using MongoDB memory server', async () => {

    // const mock = {
    //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWZjYzQwNGExODQxMzkyZjQyM2VkNSIsImlhdCI6MTcxNDQ5OTI5NCwiZXhwIjoxNzE3MDkxMjk0fQ.mFyuBVXe3NXb1h37VgjR0wd2vVnwAAkHCHE-fYKP8dA",
    //     comment: "hello world",
    //     rating: 5,
    //     dentistId: "6620b0d4efbbca938f669b71",
    //     booking: "6630a0ace48dd3c4c7876583"
    // }

    // const response = await fetch(
    //     `http://localhost:5000/api/v1/dentists/${mock.dentistId}/feedbacks`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${mock.token}`,
    //       },
    //       body: JSON.stringify({
    //         comment: mock.comment,
    //         rating: mock.rating,
    //         booking: mock.booking,
    //       }),
    //     }
    //   );

    // const responseReady = await response.json() ;
    // expect(responseReady.success).toBe(true) ;

      
      const test = await Feedback.find({});
      console.log(test.res)
})

});

//responseReady.data._id
