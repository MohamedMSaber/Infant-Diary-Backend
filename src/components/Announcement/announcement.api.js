const { ProtectedRoutes, AllowedTo } = require('../User/Auth/user.auth');
const { addAnnouncement, updateAnnouncement, deleteAnnouncement, getAnnouncements, getAnnouncementByID } = require('./announcement.services');
const router=require('express').Router();


router.route('/:userType').post(ProtectedRoutes,AllowedTo(['admin']),addAnnouncement);
router.route('/').get(getAnnouncements);
router.route('/:id').get(getAnnouncementByID).put(updateAnnouncement).delete(deleteAnnouncement);
// router.route('/:id').get(getCategoryByID).put(uploadingSingleFile('categoryImage', 'Category') , updateCategory).delete(deleteCategory);

// router.post("/addAnnouncement",addAnnouncement);
// router.put("/:id/updateAnnouncement",updateAnnouncement);
// router.delete("/:id/deleteAnnouncement",deleteAnnouncement);
// router.get("/announcements",getAnnouncements);
// router.get("/announcements/:id",getAnnouncement);

module.exports= router