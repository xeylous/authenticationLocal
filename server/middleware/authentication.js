module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next(); // User is authenticated, allow access
        }
        // If not authenticated, redirect to the login page or send a 403 error
        res.status(403).json({ message: 'You are not authorized to view this page. Please log in.' });
    }
};