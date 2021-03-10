module.exports = {
  verbose: false,
  suites: ['test/*.html'],
  plugins: {
    local: {
      browsers: ['chrome']
    },
    istanbul: {
      dir: './coverage',
      reporters: ['text-summary', 'lcov'],
      include: [
        '/*.html', '/js/*.js'
      ],
      exclude: ['/site-calendar-events-service.html']
    }
  }
};
