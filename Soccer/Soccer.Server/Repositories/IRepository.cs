namespace Soccer.Server.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetById(long id);
        Task<List<T>> GetAll();
        Task Create(T entity);
        Task Update(T entity);
        Task Delete(long id);
        Task SaveChangesAsync();
    }
}
