
let database = [
  {
    id: 1,
    name: "Jimmy Doe",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "regular",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
        keyword: "shopping",
        banner: `https://source.unsplash.com/random?shopping`,
      },
      {
        id: 2,
        title: "Walk the puppy",
        description: "Take the puppy for a walk around the block",
        completed: false,
        keyword: "dog",
        banner: "https://source.unsplash.com/random?dog",
      },
      {
        id: 3,
        title: "Biking",
        description: "Biking in stanley park",
        completed: false,
        keyword: "bike",
        banner: "https://source.unsplash.com/random?bike",
      },
      {
        id: 4,
        title: "Swimming",
        description: "Swimming at the community pool",
        completed: false,
        keyword: "swimming",
        banner: "https://source.unsplash.com/random?swimming",
      },
      {
        id: 5,
        title: "Running",
        description: "Running at the beach",
        completed: true,
        keyword: "running",
        banner: `https://source.unsplash.com/random?running`,
      }
    ],
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "admin",
    reminders: [
      {
        id: 1,
        title: "biking",
        description: "stanley park",
        completed: false,
        keyword: "biking",
        banner: "https://source.unsplash.com/random?biking",
      },
    ],
  },
  {
    id: 3,
    name: "Michael Reefs",
    email: "michaelreefs@gmail.com",
    password: "michael123!",
    role: "regular",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
        keyword: "shopping",
        banner: "https://source.unsplash.com/random?shopping",
      },
    ],
  },
  {
    id: 4,
    name: "John Doe",
    email: "john@gmail.com",
    password: "john123!",
    role: "regular",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
        keyword: "shopping",
        banner: "https://source.unsplash.com/random?shopping",
      },
    ],
  }
  
]



const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null;
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};



module.exports = { database, userModel };
