// ===============================
// Local Storage Keys
// ===============================

const USERS_KEY = "trackless_users";
const CURRENT_USER_KEY = "trackless_current_user";

// ===============================
// Internal Helpers
// ===============================

const read = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ===============================
// User Functions
// ===============================

export const getUsers = () => {
  return read(USERS_KEY) || [];
};

export const saveUsers = (users) => {
  write(USERS_KEY, users);
};

// ===============================
// Login
// ===============================

export const loginUser = (username) => {
  const users = getUsers();

  const cleanName = username.trim();

  let user = users.find(
    (u) => u.username.toLowerCase() === cleanName.toLowerCase()
  );

  if (!user) {
    user = {
      id: crypto.randomUUID(),

      username: cleanName,

      joinedAt: new Date().toISOString(),

      avatar: "🌊",

      settings: {
        theme: "ocean",
      },

      habits: [],

      history: {},

      stats: {
        currentStreak: 0,
        longestStreak: 0,
        completionRate: 0,
        totalHabits: 0,
        perfectDays: 0,
        daysTracked: 0,
      },

      ai: {
        lastReview: null,
        planner: null,
      },
    };

    users.push(user);

    saveUsers(users);
  }

  setCurrentUser(user.id);

  return user;
};

// ===============================
// Current User
// ===============================

export const setCurrentUser = (id) => {
  write(CURRENT_USER_KEY, id);
};

export const getCurrentUserId = () => {
  return read(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  const users = getUsers();

  const id = getCurrentUserId();

  return users.find((u) => u.id === id) || null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// ===============================
// Update Current User
// ===============================

export const updateCurrentUser = (updatedUser) => {
  const users = getUsers();

  const index = users.findIndex((u) => u.id === updatedUser.id);

  if (index === -1) return;

  users[index] = updatedUser;

  saveUsers(users);
};

// ===============================
// Habit CRUD
// ===============================
export const addHabit = (habitData) => {
  const user = getCurrentUser();

  if (!user) return;

  const habit = {
  id: crypto.randomUUID(),

  name: habitData.name,

  goal: Number(habitData.goal),

  unit: habitData.unit,

  streak: 0,

  longestStreak: 0,

  today: 0,

  createdAt: new Date().toISOString(),

  active: true,
};
  user.habits.push(habit);

  user.stats.totalHabits = user.habits.length;

  updateCurrentUser(user);

  return habit;
};

export const getHabits = () => {
  const user = getCurrentUser();

  if (!user) return [];

  return user.habits;
};

export const deleteHabit = (habitId) => {
  const user = getCurrentUser();

  if (!user) return [];

  user.habits = user.habits.filter(
    (habit) => habit.id !== habitId
  );

  user.stats.totalHabits = user.habits.length;

  updateCurrentUser(user);

  return user.habits;
};

export const updateHabits = (habits) => {
  const user = getCurrentUser();

  if (!user) return;

  user.habits = habits;

  updateCurrentUser(user);
};

// ===============================
// History
// ===============================

export const saveTodayHistory = (history) => {
  const user = getCurrentUser();

  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

  user.history[today] = history;

  updateCurrentUser(user);
};

export const getTodayHistory = () => {
  const user = getCurrentUser();

  if (!user) return {};

  const today = new Date().toISOString().split("T")[0];

  return user.history[today] || {};
};

// ===============================
// AI
// ===============================

export const saveAIReview = (response) => {
  const user = getCurrentUser();

  if (!user) return;

  user.ai.lastReview = {
    date: new Date().toISOString(),
    response,
  };

  updateCurrentUser(user);
};

export const saveTomorrowPlan = (response) => {
  const user = getCurrentUser();

  if (!user) return;

  user.ai.planner = {
    date: new Date().toISOString(),
    response,
  };

  updateCurrentUser(user);
};
export const updateHabitProgress = (habitId, value) => {
  const user = getCurrentUser();

  if (!user) return;

  user.habits = user.habits.map((habit) => {

    if (habit.id !== habitId) return habit;

    const previousToday = habit.today;
    const today = Math.max(0, value);

    const reachedGoalFirstTime =
      previousToday < habit.goal &&
      today >= habit.goal;

    const streak = reachedGoalFirstTime
      ? habit.streak + 1
      : habit.streak;

    return {
      ...habit,
      today,
      streak,
      longestStreak: Math.max(habit.longestStreak, streak),
    };
  });

  updateCurrentUser(user);
};