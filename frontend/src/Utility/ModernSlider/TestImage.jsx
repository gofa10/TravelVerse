const TestImage = () => {
  return (
    <div>
      <h1>اختبار الصورة</h1>
      <img
        src={import.meta.env.VITE_API_BASE_URL.replace('/api', '') + '/storage/images/TlNKx1wv4ug9iwZJ4lMvGBPOfWsFe5XO21sX84DO.png'}
        width="600"
        alt="test"
      />
    </div>
  );
};
export default TestImage;
