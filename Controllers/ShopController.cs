using Microsoft.AspNetCore.Mvc;
using Project.Models;

public class ShopController : Controller
{
    private readonly IHttpContextAccessor _accessor;
        private readonly IHomeResponsitory _homeResponsitory;
        private readonly ICartReponsitory _cartResponsitory;
        private readonly IUserResponsitory _userResponsitory;

        public ShopController(IHttpContextAccessor accessor, IHomeResponsitory homeResponsitory, ICartReponsitory cartReponsitory, IUserResponsitory userResponsitory)
        {
            _accessor = accessor;
            _homeResponsitory = homeResponsitory;
            _cartResponsitory = cartReponsitory;
            _userResponsitory = userResponsitory;
        }

    [HttpGet]
    [Route("/shop/{shopID?}")]
    public IActionResult Index(int currentPage = 1, int shopID = 1) {
        // Lấy Cookies trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        }
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        System.Console.WriteLine("sessionUserID: " + sessionUserID);
        IEnumerable<Product> products = _homeResponsitory.getProducts().ToList();
        int totalRecord = products.Count();
        int pageSize = 12;
        int totalPage = (int)Math.Ceiling(totalRecord / (double)pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        IEnumerable<Store> stores = _homeResponsitory.getStores();
        IEnumerable<Category> categories = _homeResponsitory.getCategories().ToList();
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID)).ToList();
        IEnumerable<CartDetail> carts = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID));
        if (userID != null)
        {
            List<User> users = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID)).ToList();
            _accessor?.HttpContext?.Session.SetString("UserName", users[0].sFullName);
            _accessor?.HttpContext?.Session.SetInt32("RoleID", users[0].FK_iRoleID);
        }
        else
        {
            _accessor?.HttpContext?.Session.SetString("UserName", "");
        }
        int cartCount = carts.Count();
        System.Console.WriteLine("Role ID: " + Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("RoleID")));
        ShopeeViewModel model = new ShopeeViewModel
        {
            Products = products,
            Stores = stores,
            Categories = categories,
            CartDetails = cartDetails,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage,
            UserID = Convert.ToInt32(sessionUserID),
            CartCount = cartCount,
            RoleID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("RoleID"))
        };
        return View(model);
    }
}