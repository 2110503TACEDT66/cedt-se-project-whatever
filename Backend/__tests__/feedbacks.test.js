const {
  getFeedbacks,
  getFeedback,
  addFeedback,
} = require('../controllers/feedbacks');
const Feedback = require('../models/Feedback');
const Dentist = require('../models/Dentist');

jest.mock('../models/Feedback');
jest.mock('../models/Dentist');

let req;
const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
const next = jest.fn();

beforeEach(() => {
  req = { user: {}, params: {}, query: {}, body: {} };
});

afterEach(() => {
  jest.restoreAllMocks();
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

  it('should return a feedback with the bookingId provided in the query', async () => {
    req.query = { bookingId: '420' };

    Feedback.find.mockResolvedValue([
      {
        _id: '111',
        user: '112',
        dentist: '123',
        booking: '420',
      },
    ]);

    await getFeedbacks(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      count: 1,
      averageRating: null,
      data: [{ _id: '111', user: '112', dentist: '123', booking: '420' }],
    });
  });

  it('should return all feedback when neither dentistId nor bookingId is provided', async () => {
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
      averageRating: null,
      data: [{ _id: '111', user: '112', dentist: '123' }],
    });
  });

  it('should response with status code 500 when something goes wrong', async () => {
    Feedback.find.mockRejectedValue(new Error('Server down'));

    await getFeedbacks(req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({
      success: false,
      message: 'Cannot find feedbacks',
    });
  });
});

describe('getFeeedback', () => {
  it('should return a feedback with the id provided', async () => {
    req.params = { feedbackId: '123' };
    Feedback.findById.mockResolvedValue([
      {
        _id: '123',
        user: '111',
        dentist: '112',
      },
    ]);

    await getFeedback(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      data: [{ _id: '123', user: '111', dentist: '112' }],
    });
  });

  it('should return a status code 404 when there is no feedback with the id provided', async () => {
    req.params = { feedbackId: '123' };
    Feedback.findById.mockResolvedValue(null);

    await getFeedback(req, res, next);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      success: false,
      message: 'No feedback with the id of 123',
    });
  });

  it('should response with status code 500 when something goes wrong', async () => {
    req.params = { feedbackId: '123' };
    Feedback.findById.mockRejectedValue(new Error('Server down'));

    await getFeedback(req, res, next);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({
      success: false,
      message: 'Cannot find feedback',
    });
  });
});

describe('addFeeedback', () => {
  it('should return a created feedback', async () => {
    req.params = { dentistId: '112' };
    req.user = { id: '000999abf345612388765432', name: 'Icegoo141' };
    Dentist.findById.mockResolvedValue([
      {
        _id: '112',
        name: 'Sans the Skeleton',
      },
    ]);
    Feedback.create.mockResolvedValue({
      _id: 500,
      dentist: '112',
      user: '000999abf345612388765432',
      symptom: 'help doc',
      status: 'pending',
      reqType: 'checkup',
    });

    await addFeedback(req, res, next);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      success: true,
      data: {
        _id: 500,
        dentist: '112',
        user: '000999abf345612388765432',
        symptom: 'help doc',
        status: 'pending',
        reqType: 'checkup',
      },
    });
  });

  it('should response with status code 404 when there is no dentist with the id provided', async () => {
    req.params = { dentistId: '123' };
    Dentist.findById.mockResolvedValue(null);

    await addFeedback(req, res, next);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      success: false,
      message: 'No dentist with the id of 123',
    });
  });

  it('should response with status code 500 when something goes wrong', async () => {
    req.params = { dentistId: '112' };
    req.user = { id: '000999abf345612388765432', name: 'Icegoo141' };
    Dentist.findById.mockResolvedValue([
      {
        _id: '112',
        name: 'Sans the Skeleton',
      },
    ]);
    Feedback.create.mockRejectedValue(new Error('Server down'));

    await addFeedback(req, res, next);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({
      success: false,
      message: 'Cannot add feedback',
    });
  });
});
