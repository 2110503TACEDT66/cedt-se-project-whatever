const { getFeedbacks } = require('../controllers/feedbacks');
const Feedback = require('../models/Feedback');

jest.mock('../models/Feedback');

let req;
const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
const next = jest.fn();

beforeEach(() => {
  req = { user: {}, params: {}, query: {}, body: {} };
});

describe('getFeedbacks', () => {
  it('should return feedbacks when dentistId is provided', async () => {
    req.params = { dentistId: '507f1f77bcf86cd799439011' };

    Feedback.aggregate.mockResolvedValue([{ _id: null, averageRating: 5 }]);
    Feedback.find.mockResolvedValue([
      {
        _id: '111',
        user: '112',
        dentist: '123',
      },
    ]);

    await getFeedbacks(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      count: 1,
      averageRating: 5,
      data: [{ _id: '111', user: '112', dentist: '123' }],
    });
  });

  it('should return a feedback with the feedbackId provided in the query', async () => {
    req.query = { feedbackId: '111' };

    Feedback.findById.mockResolvedValue([
      {
        _id: '111',
        user: '112',
        dentist: '123',
      },
    ]);

    await getFeedbacks(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      count: 1,
      averageRating: null,
      data: [{ _id: '111', user: '112', dentist: '123' }],
    });
  });
});
