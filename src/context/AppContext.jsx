import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER_PROFILE,
  INITIAL_GOALS,
  INITIAL_SCHEDULE,
  PRODUCTS,
  ARTISANS
} from '../data/mockData.js';

const AppContext = createContext(undefined);

const KSH_TO_USD_RATE = 0.0077; // ~ 1 USD = 130 KSh

export const AppProvider = ({ children }) => {
  // Profile
  const [userProfile, setUserProfileState] = useState(() => {
    const saved = localStorage.getItem('kisii_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [currency, setCurrency] = useState('KSh');

  // Goals
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('kisii_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  // Flat Task pool derived and synchronized with goals
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kisii_tasks');
    if (saved) return JSON.parse(saved);
    const initialTasks = [];
    INITIAL_GOALS.forEach(g => initialTasks.push(...g.tasks));
    return initialTasks;
  });

  // Habits
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('kisii_habits');
    if (saved) return JSON.parse(saved);
    const initialHabits = [];
    INITIAL_GOALS.forEach(g => initialHabits.push(...g.habits));
    return initialHabits;
  });

  // Schedule
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('kisii_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  // Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('kisii_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('kisii_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('kisii_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('kisii_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: "KH-ORD-8821",
        items: [
          { product: PRODUCTS[0], quantity: 1 }
        ],
        totalKSh: 6800,
        currency: "KSh",
        shippingAddress: {
          fullName: "Alex Omari",
          email: "alex.omari@example.com",
          phone: "+254 712 345 678",
          address: "Tabaka Road, Suneka Junction",
          city: "Nairobi",
          country: "Kenya"
        },
        paymentMethod: "mpesa",
        status: "shipped",
        trackingNumber: "DHL-KE-8910482",
        createdAt: "2026-08-18T10:30:00Z"
      }
    ];
  });

  // Modals & UI States
  const [activeProposedPlan, setActiveProposedPlan] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('shop');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kisii_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kisii_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('kisii_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('kisii_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('kisii_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('kisii_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kisii_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('kisii_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('kisii_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const updateUserProfile = (profile) => {
    setUserProfileState(prev => ({ ...prev, ...profile }));
    showToast("Profile & life constraints updated!");
  };

  const setUserProfile = (newProfile) => {
    if (typeof newProfile === 'function') {
      setUserProfileState(newProfile);
    } else {
      setUserProfileState(prev => ({ ...prev, ...newProfile }));
    }
    showToast("Profile & life constraints updated!");
  };

  const formatMoney = (kshAmount) => {
    if (currency === 'USD') {
      const usd = kshAmount * KSH_TO_USD_RATE;
      return `$${usd.toFixed(2)}`;
    }
    return `KSh ${Number(kshAmount || 0).toLocaleString()}`;
  };

  const addGoal = (goal) => {
    setGoals(prev => [goal, ...prev]);
    showToast(`Goal "${goal.title}" created successfully!`);
  };

  const updateGoal = (id, updates) => {
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    setTasks(prev => prev.filter(t => t.goalId !== id));
    setSchedule(prev => prev.filter(s => s.goalId !== id));
    showToast("Goal removed.");
  };

  const addSavingsDeposit = (goalId, amountKSh) => {
    setGoals(prev =>
      prev.map(g => {
        if (g.id === goalId) {
          const newCurrent = (g.currentAmount || 0) + amountKSh;
          const target = g.targetAmount || 1;
          const progress = Math.min(100, Math.round((newCurrent / target) * 100));
          return {
            ...g,
            currentAmount: newCurrent,
            progressPercent: progress
          };
        }
        return g;
      })
    );
    showToast(`Deposited ${formatMoney(amountKSh)} to goal!`);
  };

  const toggleMilestone = (goalId, milestoneId) => {
    setGoals(prev =>
      prev.map(g => {
        if (g.id === goalId) {
          const updatedMilestones = g.milestones.map(m => {
            if (m.id === milestoneId) {
              return {
                ...m,
                completed: !m.completed,
                completedAt: !m.completed ? new Date().toISOString().split('T')[0] : undefined
              };
            }
            return m;
          });
          const completedCount = updatedMilestones.filter(m => m.completed).length;
          const progress = Math.round((completedCount / (updatedMilestones.length || 1)) * 100);
          return {
            ...g,
            milestones: updatedMilestones,
            progressPercent: Math.max(g.progressPercent, progress)
          };
        }
        return g;
      })
    );
  };

  const addTask = (task) => {
    setTasks(prev => [task, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            showToast(`Completed: ${t.title}`);
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleHabit = (id) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id === id) {
          const nextCompleted = !h.completedToday;
          const nextStreak = nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1);
          if (nextCompleted) {
            showToast(`🔥 Streak continued! ${h.name} (${nextStreak} days)`);
          }
          return {
            ...h,
            completedToday: nextCompleted,
            streak: nextStreak
          };
        }
        return h;
      })
    );
  };

  const addHabit = (habit) => {
    setHabits(prev => [habit, ...prev]);
  };

  const addScheduleItem = (item) => {
    setSchedule(prev => [...prev, item]);
  };

  const removeScheduleItem = (id) => {
    setSchedule(prev => prev.filter(s => s.id !== id));
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
    showToast(`Added "${product.name}" to cart`);
  };

  const updateCartQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalKSh = cart.reduce((sum, item) => sum + item.product.priceKSh * item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Saved to wishlist ❤️");
        return [...prev, productId];
      }
    });
  };

  // Orders & Checkout
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `KH-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      totalKSh: cartTotalKSh,
      currency,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      status: 'processing',
      trackingNumber: `DHL-KE-${Math.floor(1000000 + Math.random() * 9000000)}`,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutModalOpen(false);
    showToast(`🎉 Order ${newOrder.id} placed successfully! Tracking sent to ${orderData.shippingAddress.email}`);
    setActiveTab('orders');
    return newOrder;
  };

  // Product Reviews
  const addProductReview = (productId, author, rating, comment, location = 'Kenya') => {
    const newRev = {
      id: `rev-${Date.now()}`,
      author,
      location,
      rating,
      date: 'Just now',
      comment,
      verifiedBuyer: true
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          const updatedReviews = [newRev, ...currentReviews];
          const avgRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: (p.reviewCount || 0) + 1,
            rating: avgRating
          };
        }
        return p;
      })
    );
    showToast("Thank you! Your verified review has been published.");
  };

  // Converts AI proposed JSON into real Goals, Milestones, ActionTasks, Habits, and Schedule
  const acceptPlanIntoLifeHub = (plan) => {
    const newGoalId = `goal-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];

    const newMilestones = (plan.milestones || []).map((m, idx) => ({
      id: `m-${Date.now()}-${idx}`,
      title: m.title,
      targetDate: m.targetDate,
      targetValue: m.targetValue || "Target",
      description: m.description || "",
      completed: false
    }));

    const newTasks = (plan.actionTasks || []).map((t, idx) => ({
      id: `t-${Date.now()}-${idx}`,
      goalId: newGoalId,
      title: t.title,
      scheduledDay: t.scheduledDay || "Today",
      priority: t.priority || "high",
      estimatedTime: t.estimatedTime || "15 min",
      category: t.category || "Action",
      completed: false
    }));

    const newHabits = (plan.habits || []).map((h, idx) => ({
      id: `h-${Date.now()}-${idx}`,
      name: h.name,
      frequency: h.frequency || 'weekly',
      cue: h.cue || 'Daily routine cue',
      benefit: h.benefit || 'Steady compound progression',
      streak: 0,
      completedToday: false,
      domain: plan.domain || 'personal_goals'
    }));

    const newScheduleItems = (plan.weeklySchedule || []).map((s, idx) => ({
      id: `s-${Date.now()}-${idx}`,
      day: s.day,
      time: s.time || "Evening",
      activity: s.activity,
      category: s.category || "Plan",
      goalId: newGoalId
    }));

    const fullGoal = {
      id: newGoalId,
      title: plan.title,
      domain: plan.domain,
      targetMetric: plan.targetMetric,
      targetAmount: plan.targetAmount || 0,
      currentAmount: 0,
      deadline: plan.deadline,
      recommendedCadence: plan.recommendedCadence,
      summary: plan.summary,
      whyThisWorks: plan.whyThisWorks,
      budgetAdjustments: plan.budgetAdjustments || [],
      milestones: newMilestones,
      tasks: newTasks,
      habits: newHabits,
      progressPercent: 0,
      createdAt: now,
      status: 'active'
    };

    // Commit to state & persistence
    setGoals(prev => [fullGoal, ...prev]);
    setTasks(prev => [...newTasks, ...prev]);
    setHabits(prev => [...newHabits, ...prev]);
    setSchedule(prev => [...newScheduleItems, ...prev]);

    setActiveProposedPlan(null);
    setIsAiModalOpen(false);
    setIsImportModalOpen(false);

    showToast(`✨ Plan "${plan.title}" accepted! Created Goal, ${newMilestones.length} Milestones & ${newTasks.length} Tasks.`);
    setActiveTab('goals');

    return {
      newGoalId,
      createdTasksCount: newTasks.length
    };
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        setUserProfile,
        currency,
        setCurrency,
        formatMoney,
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        addSavingsDeposit,
        toggleMilestone,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        habits,
        toggleHabit,
        addHabit,
        schedule,
        addScheduleItem,
        removeScheduleItem,
        products,
        artisans: ARTISANS,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalKSh,
        wishlist,
        toggleWishlist,
        orders,
        placeOrder,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        addProductReview,
        activeProposedPlan,
        setActiveProposedPlan,
        isAiModalOpen,
        setIsAiModalOpen,
        isImportModalOpen,
        setIsImportModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isCartOpen,
        setIsCartOpen,
        acceptPlanIntoLifeHub,
        activeTab,
        setActiveTab,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
